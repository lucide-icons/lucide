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

public val Lucide.MousePointer2: ImageVector
    get() {
        if (_mousePointer2 != null) {
            return _mousePointer2!!
        }
        _mousePointer2 = Builder(name = "MousePointer2", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(4.0f, 4.0f)
                lineToRelative(7.07f, 17.0f)
                lineToRelative(2.51f, -7.39f)
                lineTo(21.0f, 11.07f)
                close()
            }
        }
        .build()
        return _mousePointer2!!
    }

private var _mousePointer2: ImageVector? = null
