package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.AlignStartVertical: ImageVector
    get() {
        if (_alignStartVertical != null) {
            return _alignStartVertical!!
        }
        _alignStartVertical = Builder(name = "AlignStartVertical", defaultWidth = 24.0.dp,
                defaultHeight = 24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.0f, 14.0f)
                lineTo(13.0f, 14.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 15.0f, 16.0f)
                lineTo(15.0f, 18.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 13.0f, 20.0f)
                lineTo(8.0f, 20.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 6.0f, 18.0f)
                lineTo(6.0f, 16.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 8.0f, 14.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.0f, 4.0f)
                lineTo(20.0f, 4.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 22.0f, 6.0f)
                lineTo(22.0f, 8.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 20.0f, 10.0f)
                lineTo(8.0f, 10.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 6.0f, 8.0f)
                lineTo(6.0f, 6.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 8.0f, 4.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.0f, 2.0f)
                verticalLineToRelative(20.0f)
            }
        }
        .build()
        return _alignStartVertical!!
    }

private var _alignStartVertical: ImageVector? = null
