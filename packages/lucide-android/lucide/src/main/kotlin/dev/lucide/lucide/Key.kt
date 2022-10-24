package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Key: ImageVector
    get() {
        if (_key != null) {
            return _key!!
        }
        _key = Builder(name = "Key", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp, viewportWidth
                = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(21.0f, 2.0f)
                lineToRelative(-2.0f, 2.0f)
                moveToRelative(-7.61f, 7.61f)
                arcToRelative(5.5f, 5.5f, 0.0f, true, true, -7.778f, 7.778f)
                arcToRelative(5.5f, 5.5f, 0.0f, false, true, 7.777f, -7.777f)
                close()
                moveTo(11.39f, 11.61f)
                lineTo(15.5f, 7.5f)
                moveToRelative(0.0f, 0.0f)
                lineToRelative(3.0f, 3.0f)
                lineTo(22.0f, 7.0f)
                lineToRelative(-3.0f, -3.0f)
                moveToRelative(-3.5f, 3.5f)
                lineTo(19.0f, 4.0f)
            }
        }
        .build()
        return _key!!
    }

private var _key: ImageVector? = null
