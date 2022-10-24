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

public val Lucide.Edit2: ImageVector
    get() {
        if (_edit2 != null) {
            return _edit2!!
        }
        _edit2 = Builder(name = "Edit2", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(17.0f, 3.0f)
                arcToRelative(2.828f, 2.828f, 0.0f, true, true, 4.0f, 4.0f)
                lineTo(7.5f, 20.5f)
                lineTo(2.0f, 22.0f)
                lineToRelative(1.5f, -5.5f)
                lineTo(17.0f, 3.0f)
                close()
            }
        }
        .build()
        return _edit2!!
    }

private var _edit2: ImageVector? = null
